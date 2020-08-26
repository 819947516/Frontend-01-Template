import { create, Wrapper, Text } from './createElement';
/*
import { Carousel } from './compoents/Carousel'
import { Panel } from './compoents/Panel'
import { TabPanel } from './compoents/TabPanel'
import { LisrView } from './compoents/LisrView'

let CarouseComponent = <Carousel data = {
    ["https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"]
}></Carousel>

let PanelComponent = <Panel title='this is my panel'>
    <span> this is my content </span>
</Panel>

let TabPanelComponent = <TabPanel >
    <span title='title1'> this is my content1 </span>
    <span title='title2'> this is my content2 </span>
    <span title='title3'> this is my content3 </span>
    <span title='title4'> this is my content4 </span>
</TabPanel>

let data = [
    {
        url: 'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
        title: '猫1'
    },
    {
        url: 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
        title: '猫2'
    },
    {
        url: 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
        title: '猫3'
    },
    {
        url: 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
        title: '猫4'
    }
]

let LisrViewComponent = <LisrView data={data}>
    {record => <figure>
        <img src={record.url} />
        <figcaption>{record.title}</figcaption>
    </figure>}
</LisrView>
*/ 

const CarouseComponent = <div>
    hello world !
</div>
CarouseComponent.mountTo(document.body);
