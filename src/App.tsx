import React, {useEffect, useState} from 'react';
import './App.css';
import { CssBaseline, } from '@mui/material';
import RigsPage from './pages/RigsPage';
import { api } from './utils/api';
import { Rig, AAD } from './utils/types'
import RigsAADsPage from "./pages/RigsAADsPage";
import { CurrentStateIsDataUpdatedContext } from './contexts/CurrenStateIsDataUpdated';
import {processAADsData, processRigsData} from "./utils/helpersFunctions";

function App() {
  // console.log('App rendered');
  // const { palette } = useTheme();
  const [loading, setLoading] = useState(true);
  const [rigsData, setRigsData] = useState<Rig[]>([]);
  const [aadsData, setAADsData] = useState<AAD[]>([]);
  //////////////////////////////
  // const [isRigsDataUpdated, setIsRigsDataUpdated] = useState(false);
  // const [isAADsDataUpdated, setIsAADsDataUpdated] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  useEffect(() => {
    // console.log('App useEffect');
    Promise.all([api.getRigsData(), api.getAADsData()])
      .then(([rigs, aads]) => {
        const updatedRigsData = processRigsData(rigs, aads )
        const updatedAADsData = processAADsData(rigs, aads)
        setRigsData(updatedRigsData);
        setAADsData(updatedAADsData);
        setLoading(false);
        // console.log("Rigs Data:", updatedRigsData);
        // console.log("AADs Data:", updatedAADsData);
      })
      .catch((err) => {
        console.log('There is an error:', err);
        setLoading(false);
      });
  }, []);
  //isDataUpdated

  const handleDeleteRig = (rigID: string) => {
    api.deleteRig(rigID)
      .then(() => {
        // Is needed to pass updated rigsData to initialRows in Table
        const updatedRigsData = processRigsData(
          rigsData.filter((rig) => (rig._id !== rigID ? rig : null)),
          aadsData
        );
        setRigsData(updatedRigsData);

        // search for aad with rig = itemId and set add.rig to ''
        const aadToUpdate = aadsData.find((aad) => aad.rig === rigID)
        // If aadToUpdate exists, update its rig field to ''
        if (aadToUpdate) {
          const updatedAAD = { ...aadToUpdate, rig: '' };
          handleUpdateAAD(updatedAAD);
        }

        setIsDataUpdated(true);
        console.log(`Rig with ID ${rigID} deleted successfully`);
      })
      .catch((err) => {
        console.log("There is an error while deleting:", err);
        setIsDataUpdated(false);
      });
};

  const handleDeleteAAD = (aadID: string) => {
    api.deleteAAD(aadID)
      .then(() => {
        // Is needed to pass updated rigsData to initialRows in Table
        const updatedAADsData = processAADsData(
          rigsData,
          aadsData.filter((aad) => (aad._id !== aadID ? aad : null)),
        );
        setAADsData(updatedAADsData);
        setIsDataUpdated(true);
        console.log(`Rig with ID ${aadID} deleted successfully`);
      })
      .catch((err) => {
        console.log("There is an error while deleting:", err);
        setIsDataUpdated(false);
    });
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

  const handleCreateRig = (newRig: any) => {
    // console.log(newRig)
    api.createRig(newRig)
      .then((rig) => {
        // setRigsData([rig, ...rigsData])
        const updatedRigsData = processRigsData([...rigsData, rig], aadsData);
        setRigsData(updatedRigsData);
        setIsDataUpdated(true);
        console.log(`Item with ID ${rig._id} created successfully`)
        return rig
      })
      .catch((err) => {
        console.log("There is an error while creating:", err)
        setIsDataUpdated(false);
      });
  }

  const handleCreateAAD = (newAAD: any) => {
    api.createAAD(newAAD)
      .then((aad) => {
        const updatedAADsData = processAADsData( rigsData, [...aadsData, aad]);
        setAADsData(updatedAADsData);
        setIsDataUpdated(true);
        console.log(`Item with ID ${aad._id} created successfully`)
      })
      .catch((err) => {
        console.log("There is an error while creating:", err)
        setIsDataUpdated(false);
      });
  }

  const handleUpdateRig = (rigToUpdate: any) => {
    api.updateRigData(rigToUpdate)
      .then((updatedRig) => {
        const updatedRigsData = processRigsData(
          rigsData.map((rig) => (rig._id === updatedRig._id ? updatedRig : rig)),
          aadsData
        );
        setRigsData(updatedRigsData);
        // setIsRigsDataUpdated(true);
        setIsDataUpdated(true);
        console.log(`Item with ID ${updatedRig._id} updated successfully`);
      })
      .catch((err) => {
        console.log("There is an error while updating:", err)
        setIsDataUpdated(false);
        // setIsRigsDataUpdated(false);
      });
  }

  const handleUpdateAAD = (aadToUpdate: any) => {
    api.updateAADData(aadToUpdate)
      .then((updatedAAD) => {
        const updatedAADsData = processAADsData(
          rigsData,
          aadsData.map((aad) => (aad._id === updatedAAD._id ? updatedAAD : aad)),
        );
        setAADsData(updatedAADsData);
        setIsDataUpdated(true);
        // setIsAADsDataUpdated(true);
        console.log(`Item with ID ${updatedAAD._id} updated successfully`);
      })
      .catch((err) => {
        console.log("There is an error while updating:", err)
        setIsDataUpdated(false);
        // setIsAADsDataUpdated(false);
      });
  }


  return (
    <CurrentStateIsDataUpdatedContext.Provider value={{ isDataUpdated, setIsDataUpdated }}> {/*  value to provide from App to below components */}
      <div className="App">
        <CssBaseline />
        <h1>SKYDIVE ERP SYSTEM</h1>
        {!loading && (
          <>
            <RigsPage
              rigsData={rigsData}
              onDelete={handleDeleteRig}
              onCreate={handleCreateRig}
              onUpdate={handleUpdateRig}
              updateData={isDataUpdated}

            />
            <br />
            <RigsAADsPage
              aadsData={aadsData}
              onDelete={handleDeleteAAD}
              onCreate={handleCreateAAD}
              onUpdate={handleUpdateAAD}
              updateData={isDataUpdated}
            />
          </>
        )}

      </div>
    </CurrentStateIsDataUpdatedContext.Provider>
  );
}

export default App;
