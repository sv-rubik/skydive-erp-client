import React from 'react'
import Table from "../components/Table";
import {AAD, Rig} from "../utils/types";
import {GridRenderCellParams} from "@mui/x-data-grid";
import TableHeader from "../components/TableHeader";

interface RigsPageProps {
  rigsData: Rig[];
  // aadsData: AAD[];
  onDelete: any;
  onCreate: any;
}

const RigsPage: React.FC<RigsPageProps>  = ({ rigsData, onDelete, onCreate }) => {
  // console.log(JSON.stringify(rigsData, null, 2));

  const columns = [
    {
      field: 'rigNumber',
      headerName: 'Rig #',
      flex: 0.1,
      editable: true,
    },
    {
      field: 'rigName',
      headerName: 'Rig Name',
      flex: 0.1,
      editable: true,
    },
    {
      field: 'rigSize',
      headerName: 'Rig Size',
      flex: 0.1,
      editable: true,
    },
    {
      field: 'rigType',
      headerName: 'Rig Type',
      flex: 0.1,
      editable: true,
    },
    {
      field: 'rigSerial',
      headerName: 'Serial',
      flex: 0.1,
      editable: true,
    },
    {
      field: 'rigDOM',
      headerName: 'DOM',
      flex: 0.2,
      editable: true,
    },
    {
      field: 'container',
      headerName: 'Container',
      flex: 0.1,
      editable: true,
    },
    {
      field: 'rigDescription',
      headerName: 'Comments',
      flex: 0.2,
      editable: true,
    },
    {
      field: 'aadSerial',
      headerName: 'AAD',
      flex: 0.1,
      renderCell: (params: GridRenderCellParams) => (
        <span style={{ color:'green'}}>
          {params.value}
        </span>
      ),
    },
  ]

  return (
    <>
      <TableHeader text={`RigsPage table`} />
      <Table initialRows={rigsData} columns={columns} onDelete={onDelete} onCreate={onCreate}/>
    </>
  )
};

export default RigsPage;
