import React, {useEffect, useState} from 'react';
import './App.css';
import { CssBaseline, } from '@mui/material';
import RigsPage from './pages/RigsPage';
import { api } from './utils/api';
import { Rig, AAD } from './utils/types'
import RigsAADsPage from "./pages/RigsAADsPage";
import { CurrentRigsContext } from './contexts/CurrentRigsContext';

function App() {
  // console.log('App rendered');
  // const { palette } = useTheme();
  const [loading, setLoading] = useState(true);
  const [rigsData, setRigsData] = useState<Rig[]>([]);
  const [aadsData, setAADsData] = useState<AAD[]>([]);

  useEffect(() => {
    // console.log('App useEffect');
    Promise.all([api.getRigsData(), api.getAADsData()])
      .then(([rigs, aads]) => {
        const updatedRigsData = rigs.map((row) => {
          const matchingAAD = aads.find((aad) => aad.rig === row._id);
          return {
            ...row,
            id: row._id || '',
            aadSerial: matchingAAD ? matchingAAD.aadSerial : null,
          };
        });

        const updatedAADsData = aads.map((row) => {
          const matchingRig = updatedRigsData.find((rig) => rig._id === row.rig);
          return {
            ...row,
            id: row._id || '',
            // rigID: matchingRig ? matchingRig._id : null,
            rigName: matchingRig ? matchingRig.rigName : null,
            rigDescription: matchingRig ? matchingRig.rigDescription : null,
          };
        });

        setRigsData(updatedRigsData);
        setAADsData(updatedAADsData);
        setLoading(false);
        console.log("Rigs Data:", updatedRigsData);
        // console.log("AADs Data:", updatedAADsData);
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
    // console.log(newRig)
    api.createRig(newRig)
      .then((rig) => {
        setRigsData([rig, ...rigsData])
        console.log(`Item with ID ${rig._id} created successfully`)
        return rig
      })
      .catch((err) => console.log("There is an error while creating:", err));
  }

  // TODO
  const handleCreateAADBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newAAD: AAD = {
      _id: 'someUniqueId',
      aadSerial: 'created by button',
      aadManufacturer: 'Vigil',
      aadType: 'C2 TAN',
      aadDOM: '20.11.2023',
      aadDueService: '',
      aadFinal: '',
      jumps: 20,
      rig: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    api.createAAD(newAAD)
      .then((aad) => {
        setAADsData([aad, ...aadsData])
        console.log(`Item with ID ${aad._id}, rig ${JSON.stringify(aad)} created successfully`)
      })
      .catch((err) => console.log("There is an error while creating:", err));
  }

  const handleCreateAAD = (newAAD: any) => {
    console.log(newAAD)
    api.createAAD(newAAD)
      .then((aad) => {
        setRigsData([aad, ...aadsData])
        console.log(`Item with ID ${aad._id} created successfully`)
      })
      .catch((err) => console.log("There is an error while creating:", err));
  }


  const handleUpdateRig = (rigToUpdate: any) => {
    // console.log(rigToUpdate)
    api.updateRigData(rigToUpdate)
      .then((updatedRig) => {
        const updatedRigs = rigsData.map((rig) =>
          rig._id === updatedRig._id ? updatedRig : rig
        );
        setRigsData(updatedRigs);
        console.log(`Item with ID ${updatedRig._id} updated successfully`);
      })
      .catch((err) => console.log("There is an error while updating:", err));
  }

  const handleUpdateAAD = (aadToUpdate: any) => {
    // console.log(aadToUpdate)
    api.updateAADData(aadToUpdate)
      .then((updatedAAD) => {
        const updatedAADs = rigsData.map((rig) =>
          rig._id === updatedAAD._id ? updatedAAD : rig
        );
        setAADsData(updatedAADs);
        console.log(`Item with ID ${updatedAAD._id} updated successfully`);
      })
      .catch((err) => console.log("There is an error while updating:", err));
  }


  return (
    <CurrentRigsContext.Provider value={rigsData}> {/*  value to provide from App to below components */}
      <div className="App">
        <CssBaseline />
        <h1>SKYDIVE ERP SYSTEM</h1>
        <button onClick={handleCreateRigBtn}> Create test rig on server </button>
        <button onClick={handleCreateAADBtn}> Create test AAD on server </button>
        {!loading && (
          <>
            <RigsPage
              rigsData={rigsData}
              onDelete={handleDeleteRig}
              onCreate={handleCreateRig}
              onUpdate={handleUpdateRig}
            />
            <br />
            <RigsAADsPage
              aadsData={aadsData}
              onDelete={handleDeleteAAD}
              onCreate={handleCreateAAD}
              onUpdate={handleUpdateAAD}
            />
            {/*initialRows={rigsData as GridRowModel[]}*/}
          </>
        )}

      </div>
    </CurrentRigsContext.Provider>
  );
}

export default App;
