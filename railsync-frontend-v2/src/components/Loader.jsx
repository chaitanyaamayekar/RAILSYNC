import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const Loader = ({ size = 40 }) => (
  <div className="flex justify-center items-center p-8">
    <ThreeDots
      height={size}
      width={size}
      radius={9}
      color="#0B5ED7"
      ariaLabel="loading"
    />
  </div>
)

export default Loader