import img from '@/assets/images/logo.png';

export interface DataItem {
  id: number;
  title: string;
  content: string;
  time: string;
  img: string;
  isLoaded: boolean;
}

let dataArray: DataItem[] = [];

// 检查本地存储中是否已有数据
const storedData = localStorage.getItem('dataArray');
if (storedData) {
  dataArray = JSON.parse(storedData);
} else {
  // 如果没有，则生成新数据
  dataArray = Array.from({ length: 1000 }, (_, index) => ({
    id: index + 1,
    title: `Title ${index + 1}`, // 固定title，并添加递增的数字后缀
    content: `Content for Title ${index + 1} with some more details.`,
    time: `${Math.floor(Math.random() * 10 + 1)}周前`,
    img: img,
    isLoaded: false,
  }));
  // 保存生成的数据到本地存储
  localStorage.setItem('dataArray', JSON.stringify(dataArray));
}

export default dataArray;
