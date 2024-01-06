import React from 'react'
import { Box, Button, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridToolbar,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridEditCellValueParams,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
  onNewRow: any;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, onNewRow } = props;

  const handleClick = () => {
    //setting new row with empty cells from onNewRow
    setRows((oldRows) => [...oldRows, onNewRow]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [onNewRow.id]: { mode: GridRowModes.Edit, fieldToFocus: 'rigName' }, // TODO fieldToFocus
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
//////////////////////////////////////////
interface TableProps<T> {
  initialRows: GridRowsProp;
  columns: GridColDef[];
  onDelete: any;
  onCreate: any;
  onNewRow: any;
  onUpdate: any;
}

const Table = <T,>({ initialRows, columns, onDelete, onCreate, onNewRow, onUpdate }: TableProps<T>) => {
  const { palette } = useTheme();
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    console.log(id)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (someRow: GridRowModel) => {
    console.log(someRow);
    // new row creation on server
    if (someRow.isNew) {onCreate(someRow)}
    // row update on server
    else {onUpdate(someRow)}

    const updatedRow = { ...someRow, isNew: false };
    setRows(rows.map((row) => (row.id === someRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
    onDelete(id);
  };

  // Default Actions column
  const actionsColumn: GridColDef = {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

    if (isInEditMode) {
      return [
        <GridActionsCellItem
          icon={<SaveIcon />}
          label="Save"
          sx={{
            color: 'primary.main',
          }}
          onClick={handleSaveClick(id)}
        />,
        <GridActionsCellItem
          icon={<CancelIcon />}
          label="Cancel"
          className="textPrimary"
          onClick={handleCancelClick(id)}
          color="inherit"
        />,
      ];
    }

    return [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={handleEditClick(id)}
        color="inherit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={handleDeleteClick(id)}
        color="inherit"
      />,
    ];
  },
  }

  // Merge default columns with provided columns
  const mergedColumns = [...columns, actionsColumn];

  return (
      <Box
        mt="0.5rem"
        p="0 0.5rem"
        height="75%"
        sx={{
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${palette.grey[800]} !important`,
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: `1px solid ${palette.grey[800]} !important`,
          },
        }}
      >
        <DataGrid
          columnHeaderHeight={25}
          rowHeight={35}
          hideFooter={true}
          //initialRows as GridRowsProp || []
          rows={rows}
          columns={mergedColumns}
          editMode="row"
          // slots={{ toolbar: GridToolbar }}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => {
            console.error(error);
          }}
          // onEditCellChange={(params: GridEditCellValueParams) => {
          //   const updatedRows = rows.map((row) =>
          //     row.id === params.id ? { ...row, [params.field]: params.value } : row
          //   );
          //   setRows(updatedRows);
          // }}
          slots={{ toolbar: EditToolbar }}
          slotProps={{
            toolbar: { setRows, setRowModesModel, onNewRow },
          }}
        />
      </Box>
  )
};

export default Table;
