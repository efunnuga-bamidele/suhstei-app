import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';

import './bookitem.css'

export default function BookItem({ bookImage, title, author, owner, buttonAction, status, id, owner_id}) {

  const redirect = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const handleClick = (book_id, owner_id) => {
    // console.log(event);
    // redirect(`/view-book/${book_id}/${owner_id}`, {state: owner_id})
    redirect(`/view-book`, {state: {book_Id: book_id, owner_Id: owner_id}})
  }

  return (

          <div className="container group flex flex-col justify-center m-2 place-self-center border-2 p-2 rounded-md border-slate-200 "
            style={{"height": '400px', "width": "260px"}}
          >
         
            <div 
              className="flex flex-col relative min-h-60 w-70 sm:min-h-60 sm:w-60 aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 items-center"
              style={{"height": '100%', "width": "100%"}}
            >

              <img
                src={bookImage}
                alt={title}
                className="bookImg h-full w-full object-cover object-center "
                style={{"height": '100%', "width": "100%"}}
                // className="object-center md:object-cover object-scale-down w-full"
              />
              {owner_id !== currentUser.uid  && (

                status ==='Available' ? (
                <button type="button" className="btn bottom-3 rounded-lg " onClick={(ev) => handleClick(id, owner_id)}>
                    {buttonAction}
                  </button>
                ): (
                  <button type="button" className="btn bottom-3 rounded-lg" onClick={(ev) => handleClick(id, owner_id)}>
                    View Book
                  </button>
                )
              ) }
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700 font-semibold text-clip overflow-hidden">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">by <span className='text-primary'>{author}</span></p>
                <p className="mt-1 text-sm text-gray-500">uploaded by <span className='text-primary'>{owner}</span></p>
                {status &&(<p className="mt-1 text-sm text-gray-500">Status: <span className='text-primary'>{status}</span></p>)}
              </div>
            </div>
           
          </div>
       
  )
}
