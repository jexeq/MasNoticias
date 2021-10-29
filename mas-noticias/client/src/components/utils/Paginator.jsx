import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import DynamicRenderReports from '../report/dynamicRenderReports/DynamicRenderReports';
import './paginator.css';

export default function Paginator ({reports, publicity}) {
    const [pageNumber, setPageNumber] = useState(0);
    const dataPerPage = 10;
    const pagesVisited = pageNumber * dataPerPage;
    const dataToDisplay = reports.slice(pagesVisited, pagesVisited + dataPerPage); 

    function changePage ({selected}) {
        setPageNumber(selected)
    }
    return (
        <div>
            <DynamicRenderReports reports={dataToDisplay} publicity={publicity}/>
            <ReactPaginate 
                className="d-flex align-content-center"
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                pageCount= {Math.ceil(reports.length / dataPerPage)}
                onPageChange={changePage}
                containerClassName='pagination-cont'
                
                activeClassName='pagination-active'
                disabledClassName='pagination-disabled'
            />
        </div>
    )
}