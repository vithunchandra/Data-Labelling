import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IPageNavigationButton{
    page: number;
    totalPages: number;
    baseUrl: string;
}

export default function PageNavigationButton({page, totalPages}: IPageNavigationButton){
    const [searchParams, setSearchParams] = useSearchParams()

    function prevPage(){
        setSearchParams(searchParams => {
            searchParams.set('page', (page - 1).toString())
            return searchParams
        })
    }

    function nextPage(){
        setSearchParams(searchParams => {
            searchParams.set('page', (page + 1).toString())
            return searchParams
        })
    }

    return(
        <>
            <Button type="button" className={`me-3 ${page - 1 > 0 ? '' : 'invisible'}`} variant="contained" 
                startIcon={<ChevronLeft />} 
                onClick={prevPage}
            >Previous</Button>
            <Button type="button" className={`${page + 1 <= totalPages ? '' : 'invisible'}`} variant="contained" 
                endIcon={<ChevronRight />} 
                onClick={nextPage}
            >Next</Button>
        </>
    )
}