import { Rig, AAD } from './types'

export const processRigsData = (rigs: Rig[], aads: AAD[] ) => {
  return rigs.map((row) => {
    const matchingAAD = aads.find((aad) => aad.rig === row._id);
    return {
      ...row,
      aadSerial: matchingAAD ? matchingAAD.aadSerial : null,
    };
  });
};

export const processAADsData = (rigs: Rig[], aads: AAD[] ) => {
  return aads.map((row) => {
  const matchingRig = rigs.find((rig) => rig._id === row.rig);
    return {
      ...row,
      rigName: matchingRig ? matchingRig.rigName : null,
      rigDescription: matchingRig ? matchingRig.rigDescription : null,
    };
  });
};
