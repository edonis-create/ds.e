import FontSize from '../FontSizes';

test('snapshots of font sizes',()=>{
expect(FontSize).toMatchSnapshot();
});