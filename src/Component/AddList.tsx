import React from 'react';

interface IAddList {
  input: IState;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  edit: boolean;
  handleClick: any;
}

const AddList: React.FC<IAddList> = ({
  input,
  handleClick,
  handleChange,
  edit,
}) => {
  return (
    <form onSubmit={handleClick}>
      <h1>ADD/EDIT CUSTOMER DETAILS</h1>
      <div className='add-list'>
        <input
          type='text'
          name='name'
          className='input-class'
          onChange={handleChange}
          value={input.name}
          placeholder='Enter-Name'
        />
        <input
          type='number'
          name='age'
          className='input-class'
          onChange={handleChange}
          value={input.age}
          placeholder='Enter-Age'
        />
        <input
          type='text'
          name='url'
          className='input-class'
          onChange={handleChange}
          value={input.url}
          placeholder='Enter-Url'
        />
        <textarea
          name='note'
          className='input-class'
          onChange={handleChange}
          value={input.note}
          placeholder='Enter Note....'
        />
        <button type='submit' className='input-btn'>
          {edit ? 'Edit' : 'submit'}
        </button>
      </div>
    </form>
  );
};

export default AddList;
