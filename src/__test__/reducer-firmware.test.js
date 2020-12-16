import reducer from '../reducers/firmware-download';


describe('Test Generator Firmware Download Reducers', () => {
    it ('Should return the generator firmware download initial state', () => {
        expect(reducer(undefined, {}, )).toEqual(
            {
                loading: false,
                error: ''
            }
        )
    })
})