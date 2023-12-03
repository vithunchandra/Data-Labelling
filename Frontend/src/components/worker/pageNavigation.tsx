import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IPageNavigationButton{
    page: number;
    totalPages: number;
    baseUrl: string;
}

export default function PageNavigationButton({page, totalPages, baseUrl}: IPageNavigationButton){
    const navigate = useNavigate()
    
    function prevPage(){
        navigate(`${baseUrl}?page=${page - 1}`)
    }

    function nextPage(){
        navigate(`${baseUrl}?page=${page + 1}`)
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