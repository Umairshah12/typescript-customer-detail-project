import React from 'react';

interface IProps {
  data: IState;
  handleDelete: (id: number) => void;
  EditCustomer: (id: number) => void;
}

const CustomerList: React.FC<IProps> = ({
  data,
  handleDelete,
  EditCustomer,
}) => {
  return (
    <div>
      <li className='list'>
        <div className='list-header'>
          <img className='list-image' src={data.url} alt='' />
          <h4>{data.name}</h4>
        </div>
        <p>{data.age} year old</p>
        <p className='item-note'>{data.note}</p>

        <button
          className='del-btn'
          onClick={() => {
            handleDelete(data.id);
          }}>
          Delete
        </button>

        <button
          className='update-btn'
          onClick={() => {
            EditCustomer(data.id);
          }}>
          Edit
        </button>
      </li>
    </div>
  );
};

export default CustomerList;
