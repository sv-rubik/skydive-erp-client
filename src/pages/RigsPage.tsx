import React from 'react'
import Table from "../components/Table";
import {AAD, Rig} from "../utils/types";
import {GridRenderCellParams} from "@mui/x-data-grid";
import TableHeader from "../components/TableHeader";
import {randomId} from "@mui/x-data-grid-generator";

interface RigsPageProps {
  rigsData: Rig[];
  // aadsData: AAD[];
  onDelete: any;
  onCreate: any;
  onUpdate: any;
  updateData: any;
}

const RigsPage: React.FC<RigsPageProps>  = ({ rigsData, onDelete, onCreate, onUpdate, updateData }) => {
  // console.log(JSON.stringify(rigsData, null, 2));
  const _id = randomId();
  const newRigRow = {
    _id,
    rigNumber: '',
    rigName: '',
    rigSize: '',
    rigType: '',
    rigSerial: '',
    rigDOM: '',
    rigDescription: '',
    container: '',
    isNew: true
  };

  const columns = [
    {
      field: '_id',
      headerName: 'Rig _id',
      flex: 0.2,
    },
    {
      field: 'rigNumber',
      headerName: 'Rig #',
      flex: 0.1,
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'rigName',
      headerName: 'Rig Name',
      flex: 0.1,
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'rigSize',
      headerName: 'Rig Size',
      flex: 0.1,
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'rigType',
      headerName: 'Rig Type',
      flex: 0.1,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['tandem', 'student', 'instructor'],
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'rigSerial',
      headerName: 'Serial',
      flex: 0.1,
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'rigDOM',
      headerName: 'DOM',
      flex: 0.2,
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'container',
      headerName: 'Container',
      flex: 0.1,
      editable: true,
      headerClassName: 'super-app-theme--header',
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
      <Table
        initialRows={rigsData}
        columns={columns}
        onDelete={onDelete}
        onCreate={onCreate}
        onNewRow={newRigRow}
        onUpdate={onUpdate}
        updateData={updateData}
      />
    </>
  )
};

export default RigsPage;
