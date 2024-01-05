import React from 'react'
import Table from "../components/Table";
import {AAD, Rig} from "../utils/types";
import { GridRenderCellParams } from '@mui/x-data-grid';
import TableHeader from "../components/TableHeader";

interface RigsAADsPageProps {
  aadsData: AAD[];
  onDelete: any;
  onCreate: any;
}

const RigsAADsPage: React.FC<RigsAADsPageProps>  = ({ aadsData, onDelete, onCreate }) => {
  // console.log(aadsData)
  const columns = [
    {
      field: 'rigID',
      headerName: 'Rig _id',
      flex: 0.1,
      renderCell: (params: GridRenderCellParams) => (
        <span style={{ color:'blue'}}>
          {params.value}
        </span>
      ),
    },
    {
      field: 'rigName',
      headerName: 'Rig Name',
      flex: 0.1,
      editable: true,
      renderCell: (params: GridRenderCellParams) => (
        <span style={{ color:'blue'}}>
          {params.value}
        </span>
      ),
    },
    {
      field: 'aadSerial',
      headerName: 'aadSerial',
      flex: 0.1,
      editable: true,
    },
    {
      field: 'aadManufacturer',
      headerName: 'aadManufacturer',
      flex: 0.1,
      editable: true,
    },
    {
      field: 'aadType',
      headerName: 'aadType',
      flex: 0.1,
      editable: true,
    },
    {
      field: 'aadDOM',
      headerName: 'aadDOM',
      flex: 0.2,
      editable: true,
    },
    {
      field: 'jumps',
      headerName: 'jumps',
      flex: 0.1,
      editable: true,
    },
    {
      field: 'rigDescription',
      headerName: 'Comments',
      flex: 0.3,
      editable: true,
      renderCell: (params: GridRenderCellParams) => (
        <span style={{ color:'blue'}}>
          {params.value}
        </span>
      ),
    },
  ]

  return (
    <>
      <TableHeader text={`RigsAADsPage table`} />
      <Table initialRows={aadsData} columns={columns} onDelete={onDelete} onCreate={onCreate}/>
    </>

  )
};

export default RigsAADsPage;
