'use client'

import React from 'react'
import { Id } from '../../../../convex/_generated/dataModel'

interface ResultDetailsProps {
  resultId: Id<'results'>
}

const ResultDetails = ({ resultId }: ResultDetailsProps) => {
  return <div>{resultId}</div>
}

export default ResultDetails
