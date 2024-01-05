import React, {useEffect, useState} from 'react';
import './App.css';
import { CssBaseline, } from '@mui/material';
import RigsPage from './pages/RigsPage';
import { api } from './utils/api';
import { Rig, AAD } from './utils/types'
import RigsAADsPage from "./pages/RigsAADsPage";
import { CurrentRigsContext } from './contexts/CurrentRigsContext';

function App() {
  // const { palette } = useTheme();
  const [loading, setLoading] = useState(true);
  const [rigsData, setRigsData] = useState<Rig[]>([]);
  const [aadsData, setAADsData] = useState<AAD[]>([]);

  useEffect(() => {
    Promise.all([api.getRigsData(), api.getAADsData()])
      .then(([rigs, aads]) => {
        // setRigsData(rigs);
        setRigsData(
        rigs.map((row) => {
          const matchingAAD = aadsData.find((aad) => aad.rig === row._id);
          // console.log(JSON.stringify(rigs, null, 2));
          return {
            ...row,
            id: row._id || '', // Use the _id property as the id
            aadSerial: matchingAAD ? matchingAAD.aadSerial : null,
          }
        }));
        // setAADsData(aads);
        setAADsData(
          aads.map((row) => {
            const matchingRig = rigsData.find((rig) => rig._id === row.rig);
            return {
              ...row,
              id: row._id || '',
              rigID: matchingRig ? matchingRig._id : null,
              rigName: matchingRig ? matchingRig.rigName : null,
              rigDescription: matchingRig ? matchingRig.rigDescription : null,
            };
          }));
        setLoading(false);
      })
      .catch((err) => {
        console.log('There is an error:', err);
        setLoading(false);
      });
  }, []);

  type DeleteApiFunction = (itemId: string) => Promise<any>;
  const handleDeleteItem = (
    itemId: string,
    apiFunction: DeleteApiFunction
  ) => {
    apiFunction(itemId)
      .then(() => console.log(`Item with ID ${itemId} deleted successfully`))
      .catch((err) => console.log("There is an error while deleting:", err));
  };
// DeleteApiFunction for "rig" model
  const handleDeleteRig = (itemId: string) => {
    handleDeleteItem(itemId, api.deleteRig.bind(api));
  }
// DeleteApiFunction for "aad" model
  const handleDeleteAAD = (itemId: string) => {
    handleDeleteItem(itemId, api.deleteAAD.bind(api));
  };

  // type CreateApiFunction = (itemId: string) => Promise<any>;
  // const handleCreateItem = (
  //   itemId: string,
  //   apiFunction: CreateApiFunction
  // ) => {
  //   apiFunction(itemId)
  //     .then(() => console.log(`Item with ID ${itemId} deleted successfully`))
  //     .catch((err) => console.log("There is an error while deleting:", err));
  // };
// // CreateApiFunction for "rig" model
//   const handleCreateRig = (itemId: string) => {
//     handleCreateItem(itemId, api.createRig.bind(api));
//   }
// // CreateApiFunction for "aad" model
//   const handleCreateAAD = (itemId: string) => {
//     handleCreateItem(itemId, api.createRig.bind(api));
//   };

  const handleCreateRigBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newRig: Rig = {
      _id: 'someUniqueId',
      rigNumber: 1,
      rigName: 'newrig',
      rigSize: 220,
      rigType: 'tandem',
      rigSerial: 'kjgfdfkjg',
      rigDOM: '2025-11-20T00:00:00.000Z',
      rigDescription: 'text',
      container: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    api.createRig(newRig)
      .then((rig) => {
        setRigsData([rig, ...rigsData])
        console.log(`Item with ID ${rig._id}, rig ${JSON.stringify(rig)} created successfully`)
      })
      .catch((err) => console.log("There is an error while creating:", err));
  }

  const handleCreateRig = (newRig: any) => {
    console.log(newRig)
    api.createRig(newRig)
      .then((rig) => {
        setRigsData([rig, ...rigsData])
        console.log(`Item with ID ${rig._id} created successfully`)
      })
      .catch((err) => console.log("There is an error while creating:", err));
  }

  return (
    <CurrentRigsContext.Provider value={rigsData}> {/*  value to provide from App to below components */}
      <div className="App">
        <CssBaseline />
        <h1>SKYDIVE ERP SYSTEM</h1>
        <button onClick={handleCreateRigBtn}> Create test rig on server </button>
        {!loading && (
          <>
            <RigsPage
              rigsData={rigsData}
              onDelete={handleDeleteRig}
              onCreate={handleCreateRig}
            />
            <br />
            <RigsAADsPage
              aadsData={aadsData}
              onDelete={handleDeleteAAD}
              onCreate={handleCreateRig}
            />
            {/*initialRows={rigsData as GridRowModel[]}*/}
          </>
        )}

      </div>
    </CurrentRigsContext.Provider>
  );
}

export default App;
