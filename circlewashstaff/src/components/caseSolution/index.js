import React from 'react';
import CaseSolutionAdmin from './caseSolutionAdmin';
import CaseSolutionStaff from './caseSolutionStaff';

export default function CaseSolution({fileCase, user}){
    return(
        <div>
        {(user.role) === 'admin' ? (
            <CaseSolutionAdmin fileCase={fileCase} />
            ) : (
            <CaseSolutionStaff fileCase={fileCase}/>
            )
        }
        </div> )   
}