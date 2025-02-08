import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { WebhookEvent } from '@clerk/nextjs/server'
import { Webhook } from 'svix'
import { api } from './_generated/api'

const http = httpRouter()

http.route({
  path: '/clerk-webhook',
  method: 'POST',
  handler: httpAction(async (ctx, req) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
    if (!webhookSecret) {
      throw new Error('Missing CLERK_WEBHOOK_SECRET')
    }

    console.log({ req })
    const svix_id = req.headers.get('svix-id')
    const svix_signature = req.headers.get('svix-signature')
    const svix_timestamp = req.headers.get('svix-timestamp')

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response('svix headers not found', {
        status: 400,
      })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(webhookSecret)
    let event: WebhookEvent

    try {
      event = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent
    } catch (error) {
      console.error('webhook error: ', error)
      return new Response('Error', { status: 400 })
    }

    const eventType = event.type

    switch (eventType) {
      case 'user.created':
      case 'user.updated':
        const {
          id,
          first_name,
          last_name,
          email_addresses,
          has_image,
          image_url,
          username,
        } = event.data

        const email =
          email_addresses.length > 0 ? email_addresses[0].email_address : ''
        const emailVerified = email_addresses.some(
          (email) => email.verification?.status === 'verified'
        )

        try {
          await ctx.runMutation(api.users.syncUser, {
            clerkId: id,
            email,
            picture: has_image ? image_url : '',
            nickname: username ? username : '',
            givenName: first_name ? first_name : '',
            familyName: last_name ? last_name : '',
            emailVerified,
          })
        } catch (error) {
          console.error('Error creating user', error)
          return new Response('Failed to create user', { status: 500 })
        }
        return new Response('Webhook processed successfully', { status: 200 })
      case 'user.deleted':
        try {
          await ctx.runMutation(api.users.deleteUser, {
            clerkId: event.data.id ? event.data.id : '',
          })
        } catch (error) {
          console.error('Error deleting user', error)
          return new Response('Failed to delete user', { status: 500 })
        }
        return new Response('Webhook processed successfully', { status: 200 })
      default:
        throw new Error('event type unknown')
    }
  }),
})

export default http
