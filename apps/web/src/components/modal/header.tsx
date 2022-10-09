import React from "react";

export const ModalHeader = ({ header }: any) => {
  if (typeof header !== "string") {
    return null;
  }
  return <div className='trade-modal-header'>
    <div className='trade-modal-title'>{header}</div>
  </div>;
};
