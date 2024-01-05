import React from 'react'

type Props = {
  text: string;
}

const TableHeader = ({ text }: Props) => {

  return (
    <h3>{text}</h3>
  )
};

export default TableHeader;
