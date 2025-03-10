import { Images } from 'assets';
import { NavigationService, Routes } from 'navigation';

export const DATA_CATEGORIES = [
  {
    id: 1,
    image: Images.food,
    name: 'Đồ ăn',
  },
  {
    id: 2,
    image: Images.drink,
    name: 'Thức uống',
  },
  {
    id: 3,
    image: Images.booking,
    name: 'Đặt bàn',
  },
  {
    id: 4,
    image: Images.promotion,
    name: 'Ưu đãi',
  },
  {
    id: 5,
    image: Images.biker,
    name: 'Xe ôm',
    onPress: () => NavigationService.navigate(Routes.Biker),
  },
  {
    id: 6,
    image: Images.delivery,
    name: 'Giao hàng',
    onPress: () => NavigationService.navigate(Routes.RequestDelivery),
  },
  {
    id: 7,
    image: Images.comestic,
    name: 'Mỹ phẩm',
  },
  {
    id: 8,
    image: Images.working,
    name: 'Giúp việc',
  },
];
export const DATA_SUGGEST = [
  {
    id: 1,
    image: Images.comgaxoimo,
    name: 'Cơm Gà Xối Mỡ 142 - Đinh Tiên Hoàng',
  },
  { id: 2, image: Images.comga, name: 'Cơm gà Luộc Quảng Nam' },
  { id: 3, image: Images.phobo, name: 'Phở bò - phở gà nguyễn Đình chiểu' },
  { id: 4, image: Images.hutieu, name: 'Hủ tiếu Nam Vang - Nguyễn Thị Thập' },
];
export const DATA_FOOD = [
  {
    id: 1,
    image: Images.bundau,
    name: 'Hà nội phố - bún đậu mắm tôm Chả mực ',
    data: [
      {
        id: 1,
        image: Images.bundau,
        name: 'Bún đậu mắm tôm',
        price: 100000,
        extraFood: [
          {
            id: 1,
            name: 'Chả cua',
            price: 40000,
          },
          {
            id: 2,
            name: 'Chả cốm',
            price: 25000,
          },
          {
            id: 3,
            name: 'Dồi sụn',
            price: 30000,
          },
          {
            id: 1,
            name: 'Chả cua',
            price: 40000,
          },
          {
            id: 2,
            name: 'Chả cốm',
            price: 25000,
          },
          {
            id: 3,
            name: 'Dồi sụn',
            price: 30000,
          },
          {
            id: 1,
            name: 'Chả cua',
            price: 40000,
          },
          {
            id: 2,
            name: 'Chả cốm',
            price: 25000,
          },
          {
            id: 3,
            name: 'Dồi sụn',
            price: 30000,
          },
          {
            id: 1,
            name: 'Chả cua',
            price: 40000,
          },
          {
            id: 2,
            name: 'Chả cốm',
            price: 25000,
          },
          {
            id: 3,
            name: 'Dồi sụn',
            price: 30000,
          },
        ],
      },
      {
        id: 2,
        image: Images.bundau,
        name: 'Bún đậu tá lả',
        price: 120000,
      },
      {
        id: 3,
        image: Images.bundau,
        name: 'Bún đậu tá lả combo 2 người',
        price: 140000,
      },
    ],
  },
  {
    id: 2,
    image: Images.buncha,
    name: 'Bún Chả Hà Nội 1982 - Nguyễn Ngọc Lộc',
    data: [
      {
        id: 1,
        image: Images.bunthitnuong,
        name: 'Bún Chả Thịt Nướng',
        price: 45000,
      },
      {
        id: 2,
        image: Images.bunthitnuong,
        name: 'Bún Chả Suờng Nướng',
        price: 55000,
      },
      {
        id: 3,
        image: Images.bunthitnuong,
        name: 'Bún Chả giò',
        price: 35000,
      },
    ],
  },
  {
    id: 3,
    image: Images.bunthitnuong,
    name: 'Bún Thịt Nướng 149 - Tô Hiến Thành',
    data: [
      {
        id: 1,
        image: Images.bunthitnuong,
        name: 'Bún Thịt Nướng',
        price: 45000,
      },
      {
        id: 2,
        image: Images.bunthitnuong,
        name: 'Bún Thịt Suờng Nướng',
        price: 45000,
      },
      {
        id: 3,
        image: Images.bunthitnuong,
        name: 'Bún Chả giò',
        price: 45000,
      },
    ],
  },
  {
    id: 4,
    image: Images.comsuon,
    name: 'Tiệm Hai Mẹ Con - Cơm Gà Chiên Giòn & Cơm Sườn Bì Chả - Điện Biên Phủ',
    data: [
      {
        id: 1,
        image: Images.comsuon,
        name: 'Cơm Gà Chiên Giòn',
        price: 45000,
        extraFood: [
          {
            id: 1,
            name: 'Cơm thêm',
            price: 5000,
          },
        ],
      },
      {
        id: 2,
        image: Images.comsuon,
        name: 'Cơm Sườn Bì Chả - Điện Biên Phủ',
        price: 45000,
        extraFood: [
          {
            id: 1,
            name: 'Cơm thêm',
            price: 5000,
          },
          {
            id: 1,
            name: 'Chả',
            price: 10000,
          },
          {
            id: 1,
            name: 'Trứng ốp la',
            price: 5000,
          },
        ],
      },
      {
        id: 1,
        image: Images.comsuon,
        name: 'Cơm chiên dương châu',
        price: 45000,
        extraFood: [
          {
            id: 1,
            name: 'Cơm thêm',
            price: 5000,
          },
        ],
      },
    ],
  },
  // {
  //   id: 5,
  //   image: Images.bundau,
  //   name: 'Hà nội phố - bún đậu mắm tôm Chả mực ',
  // },
  // {
  //   id: 6,
  //   image: Images.buncha,
  //   name: 'Bún Chả Hà Nội 1982 - Nguyễn Ngọc Lộc',
  // },
  // {
  //   id: 7,
  //   image: Images.bunthitnuong,
  //   name: 'Bún Thịt Nướng 149 - Tô Hiến Thành',
  // },
  // {
  //   id: 8,
  //   image: Images.comsuon,
  //   name: 'Tiệm Hai Mẹ Con - Cơm Gà Chiên Giòn & Cơm Sườn Bì Chả - Điện Biên Phủ',
  // },
  // {
  //   id: 9,
  //   image: Images.bundau,
  //   name: 'Hà nội phố - bún đậu mắm tôm Chả mực ',
  // },
  // {
  //   id: 10,
  //   image: Images.buncha,
  //   name: 'Bún Chả Hà Nội 1982 - Nguyễn Ngọc Lộc',
  // },
  // {
  //   id: 11,
  //   image: Images.bunthitnuong,
  //   name: 'Bún Thịt Nướng 149 - Tô Hiến Thành',
  // },
  // {
  //   id: 12,
  //   image: Images.comsuon,
  //   name: 'Tiệm Hai Mẹ Con - Cơm Gà Chiên Giòn & Cơm Sườn Bì Chả - Điện Biên Phủ',
  // },
];
export const EXTRA_FOOD = [
  {
    id: 1,
    name: 'Canh rong biển',
    price: 20000,
  },
  {
    id: 2,
    name: 'Canh khổ qua nhồi thịt',
    price: 25000,
  },
  {
    id: 3,
    name: 'Canh chua cá lóc',
    price: 30000,
  },
  {
    id: 3,
    name: 'Cơm thêm',
    price: 5000,
  },
];
