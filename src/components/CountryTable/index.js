import React,{useEffect,useState} from 'react';
import SearchBox from '../SearchBox'
import SortingIcon from '../SortingIcon'
import Loader from '../Loader/Loader';
import { getAllCountries,getCountriesByType } from '../util'


export default ()=>{
    const [tableData,setTableData] = useState({isAPIFailed:false,data:[],loader:true});
    const [sortingPopulation,setSortingPopulation] = useState({active:false,asc:true})
    const [searchType,setSearchType] = useState("name")
    
    useEffect(()=>{

      getAllCountries()
          .then(({data})=>{
            setTableData({isAPIFailed:false,data:data,loader:false})  
          })
          .catch((err)=>{
            setTableData({isAPIFailed:true,data:[],loader:false})
        })
    },[])
    
    useEffect(()=>{
      if(sortingPopulation.active){
        setTableData({isAPIFailed:false,data:[...tableData.data.sort(sortingTableData(sortingPopulation.asc))]});
      };
    },[sortingPopulation])

    let onClickSorting = (asc)=>{
        setSortingPopulation({active:true,asc}) 
    }

    let onSearchText = (text)=>{
      setTableData({...tableData,loader:true})
      if(text){
          let type = searchType==='code'?'alpha':'name';

          getCountriesByType(type,text)
            .then(({data})=>{
              let apiData = data;
              if(apiData.constructor.name !== "Array"){
                apiData = [{...apiData}]
              }
              if(sortingPopulation.active){
                apiData.sort(sortingTableData(sortingPopulation.asc))
              }
              setTableData({isAPIFailed:false,data:apiData,loader:false}) 
            })
            .catch((err)=>{
              setTableData({isAPIFailed:true,data:[],loader:false})
          })
     }else{
          getAllCountries()
            .then(({data})=>{
              if(sortingPopulation.active){
                data.sort(sortingTableData(sortingPopulation.asc))
              }
              setTableData({isAPIFailed:false,data:data,loader:false})  
            })
            .catch((err)=>{
              setTableData({isAPIFailed:true,data:[],loader:false})
          })
     }
    }
    
    let onChangeSearchType = (type)=>{
        setSearchType(type);
    };
    
    return (<div className="table-responsive pt-1">   
    
    <SearchBox onSearchText={onSearchText} onChangeSearchType={onChangeSearchType}/>
    
    {<Loader loading={tableData.loader} />}
    
    <table className="table table-bordered mt-4">
    <thead>
      <tr>
        <th>Name</th>
        <th>Code</th>
        <th>Population <SortingIcon active={sortingPopulation.active} asc={sortingPopulation.asc} sortingOnClick={onClickSorting}/></th>
        <th>Captial City</th>
        <th>Language</th>
        <th>Currency</th>
      </tr>
    </thead>
    <tbody>
     {tableData.data.length?tableData.data.map((ele,i)=>{
         return  <tr key={i}>
         <td width="20%"><img className="img-fluid" src={ele.flag} width="15"/><span className="pl-2">{ele.name}</span></td>
         <td width="30%">{ele.alpha3Code}</td>
         <td width="30%">{ele.population}</td>
         <td width="20%">{ele.capital}</td>
         <td width="20%">{ele.languages.map((item)=>item.name).join(',')}</td>
         <td>{ele.currencies.map((item)=>`${item.name}`).join(',')}</td>
       </tr>
     }):!!tableData.isAPIFailed&&<tr><td><i>No Records found</i></td></tr>}
     
    </tbody>
  </table>
  
  </div>)
}


function sortingTableData(asc=true){
    return (a,b)=>{
        if(asc){
          return a.population - b.population;
        }
        return b.population - a.population;
    }
}