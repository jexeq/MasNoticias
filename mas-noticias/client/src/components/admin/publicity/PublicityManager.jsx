import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import PublicityCreator from './PublicityCreator';
import { getAllPublicities } from '../../../redux/actions/publicity/publicityActions';

export default function PublicityManager () {

    return (
        <div>
            <h1>Administrar Publicidades</h1>
            <div>
                <h4>Acciones</h4>
                <hr />
                <NavLink to='/admin/create-publicity'>
                    <button> Crear Nueva Publicidad </button>
                </NavLink>
            </div>
        </div>
    )
}