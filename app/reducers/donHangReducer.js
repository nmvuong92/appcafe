import * as types from './../actions/actionTypes';
const initialState = {
    isFetching: false,
    List:null,
    Paging:null,

    isFetchingTichDiem:false,
    isFetchingPickBoSung:false,
    ListTichDiem:null,
    PagingTichDiem:null,

    ListPickBoSung:null,

    SoLuongDonHangChuaThanhToan:0,
}

export default donHangReducer  = (state=initialState,action)=>{
    switch (action.type) {
        case types.DONHANG_FETCH: //trang thai dang fetch loading true
            return{
                ...state,
                ...{isFetching:action.isFetching}
            };
         case types.DONHANG_FETCHBS: //trang thai dang fetch loading true
            return{
                ...state,
                ...{isFetchingPickBoSung:action.isFetching}
            };    
            
       case types.DONHANG_RECEIVE: //nhan ve food
            return{
                ...state,
                ...{
                        List:action.List,
                        Paging:action.Paging,
                        isFetching: false,
                        SoLuongDonHangChuaThanhToan:action.SoLuongDonHangChuaThanhToan
                   } //gan food moi, loading false
            };
        case types.DONHANG_BS_RECEIVE: //nhan ve food
            return{
                ...state,
                ...{
                        ListPickBoSung:action.List,
                        isFetchingPickBoSung: false,
                   } //gan food moi, loading false
            };
   
        //tich diem
        case types.DONHANG_TICHDIEM_FETCH: 
            return{
                ...state,
                ...{isFetching:action.isFetching}
            };

        
        case types.DONHANG_TICHDIEM_RECEIVE: 
            return{
                ...state,
                ...{
                        ListTichDiem:action.List,
                        PagingTichDiem:action.Paging,
                        isFetching: false,
                        SoLuongDonHangChuaThanhToan:action.SoLuongDonHangChuaThanhToan
                } //gan food moi, loading false
            };

        case types.POST_DATHANG_FETCH: //
            return{
                ...state,
                ...{isFetching:action.isFetching}
            };
       default:
            return state;
    }
};