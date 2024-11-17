import { configureStore } from '@reduxjs/toolkit';
import phaseSlice from '../Slice/phaseSlice'
import blockSlice from '../Slice/blockSlice'
import userSlice from '../Slice/userSlice'
import uploadSlice from '../Slice/uploadSlice'
import permissionSlice from '../Slice/permissionSlice'
import ownerSlice from '../Slice/ownerSlice'
import membershipSlice from '../Slice/membershipSlice'
import chargesSlice from '../Slice/chargesSlice';
import chargesTypeSlice from '../Slice/chargesTypeSlice';
import transferSlice from '../Slice/transferSlice';





export const store = configureStore({
    reducer: {
        Phase: phaseSlice,
        Block: blockSlice,
        upload: uploadSlice,
        User: userSlice,
        Permission: permissionSlice,
        Owner: ownerSlice,
        Membership: membershipSlice,
        Charge: chargesSlice,
        ChargreType: chargesTypeSlice,
        transfer: transferSlice
    }
})