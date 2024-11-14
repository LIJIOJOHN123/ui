import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getByIdClientAction } from '../../store/clientManagementSlice';

const ClientDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.clientManagement.dataById);

    React.useEffect(() => {
      dispatch(getByIdClientAction(id))
    }, [id]);
    return (
        <Fragment>
            <h1>Client details</h1>
            <p>{data._id}</p>
            <p>{data.name}</p>
            <p>{data.email}</p>
        </Fragment>
      );
}
 
export default ClientDetails;