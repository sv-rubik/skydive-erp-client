export interface Rig {
  _id: string;
  rigNumber: number;
  rigName: string;
  rigSize: number;
  rigType: 'tandem' | 'student' | 'instructor';
  rigSerial: string;
  rigDOM: string;
  rigDescription?: string;
  container: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AAD {
  _id: string;
  aadSerial: string;
  aadManufacturer: string;
  aadType: 'C2 TAN' | 'C-MODE' | 'C2 STU' | 'C2 CMode';
  aadDOM: string;
  aadDueService: string;
  aadFinal: string;
  jumps: number;
  rig: string;
  createdAt: Date;
  updatedAt: Date;
}
