// You can call this from any reduxed component as this.props.goToComponent1(params)
export function goToComponent1(params) 
{
    return (dispatch, getState) => {
        dispatch(NavigationActions.navigate({ routeName: 'Home', params: params }));
    };
}