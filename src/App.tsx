import React, { useState, useEffect, FormEventHandler } from 'react';
import './App.css';
import { useQuery } from 'react-query';
import List from './Component/CustomerList';
import AddCustomer from './Component/AddList';
import CircularProgress from '@material-ui/core/CircularProgress';

// FETCH ALL CUSTOMER RECORD
const getCustomers = async (): Promise<IState[]> => {
  return await (await fetch('http://localhost:3004/customers')).json();
};

function App() {
  const [customer, setCustomer] = useState([] as IState[]);
  const [input, setInput] = useState({
    id: 0,
    name: '',
    age: 0,
    url: '',
    note: '',
  });

  const [edit, setEdit] = useState<boolean>(false);
  const { isLoading, error, data } = useQuery<IState[]>(
    'customers',
    getCustomers
  );

  useEffect(() => {
    getCustomers();
    if (data) {
      setCustomer(data);
    }
  }, [data]);

  if (isLoading)
    return (
      <p className='loader'>
        Loading Please wait ...
        <CircularProgress />
      </p>
    );
  if (error) return <p>Error Occur During Fetching...</p>;

  // CLEAR INPUTS FUNCTION
  const clearFields = () => {
    setInput({
      id: 0,
      name: '',
      age: 0,
      url: '',
      note: '',
    });
  };

  // DELETE CUSTOMER RECORD
  const handleDelete = async (id: number) => {
    let delCustomer = customer.filter((item) => item.id !== id);
    setCustomer(delCustomer);
    const config = {
      method: 'DELETE',
    };
    let res = await fetch(`http://localhost:3004/customers/${id}`, config);
    return res;
  };

  // GET SPECIFIC CUSTEMER RECORD
  const EditCustomer = (id: number) => {
    let currentCustomer = customer?.find((item) => item.id === id);
    setEdit(true);
    if (currentCustomer) {
      setInput({
        id: currentCustomer.id,
        name: currentCustomer.name,
        age: currentCustomer.age,
        url: currentCustomer.url,
        note: currentCustomer.note,
      });
    }
  };

  // INPUT CHANGE FUNCTION
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // EDIT AND UPDATE FUNCTION
  const handleClick = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      input.name === '' ||
      input.url === '' ||
      input.age <= 0 ||
      input.note === ''
    ) {
      alert('pleas fill all the fields');
    } else {
      try {
        if (edit) {
          const config = {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
          };
          let res = await fetch(
            `http://localhost:3004/customers/${input.id}`,
            config
          );

          let tempdataExpenses = customer?.map((item) =>
            item.id === input.id
              ? {
                  ...item,
                  name: input.name,
                  age: input.age,
                  url: input.url,
                  note: input.note,
                }
              : item
          );
          setCustomer(tempdataExpenses);
          setEdit(false);
          clearFields();
          return res;
        } else {
          const config = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
          };
          let res = await fetch('http://localhost:3004/customers', config);
          setCustomer((prevState: any) => {
            return [
              ...prevState,
              {
                name: input.name,
                age: input.age,
                url: input.url,
                note: input.note,
              },
            ];
          });
          clearFields();
          return res;
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className='App'>
      <h1>CUSTOMERS LIST</h1>
      {customer?.map((item) => {
        return (
          <ul key={item.id}>
            <List
              data={item}
              handleDelete={handleDelete}
              EditCustomer={EditCustomer}
            />
          </ul>
        );
      })}
      <AddCustomer
        edit={edit}
        handleClick={handleClick}
        input={input}
        handleChange={handleChange}
      />
    </div>
  );
}

export default App;
