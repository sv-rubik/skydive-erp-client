import React from 'react'
import Table from "../components/Table";
import {AAD, Rig} from "../utils/types";
import {GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import TableHeader from "../components/TableHeader";
import {randomId} from "@mui/x-data-grid-generator";

interface RigsAADsPageProps {
  aadsData: AAD[];
  onDelete: any;
  onCreate: any;
  onUpdate: any;
}

const RigsAADsPage: React.FC<RigsAADsPageProps>  = ({ aadsData, onDelete, onCreate, onUpdate }) => {
  const id = randomId();
  const newAADRow = {
    id,
    aadSerial: '',
    aadManufacturer: '',
    aadType: '',
    aadDOM: '',
    aadDueService: '',
    aadFinal: '',
    jumps: '',
    rig: '',
    isNew: true
  }

  const columns: GridColDef[] = [
    {
      field: 'rig',
      headerName: 'Rig _id from AAD',
      headerClassName: 'super-app-theme--header',
      // headerAlign: 'center',
      flex: 0.2,
      editable: true,
      renderCell: (params: GridRenderCellParams) => (
          <span style={{ color:'red'}}>
            {params.value}
          </span>
      ),
    },
    {
      field: 'rigName',
      headerName: 'Rig Name',
      flex: 0.1,
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
      type: 'singleSelect',
      valueOptions: ['C2 TAN', 'C-MODE', 'C2 STU', 'C2 CMode'],
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
      <Table
        initialRows={aadsData}
        columns={columns}
        onDelete={onDelete}
        onCreate={onCreate}
        onNewRow={newAADRow}
        onUpdate={onUpdate}
      />
    </>

  )
};

export default RigsAADsPage;
