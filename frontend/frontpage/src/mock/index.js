import Mock, { Random } from 'mockjs';
export default [
    {
      url: '/api/get',
      method: 'post',
      response: ({body}) => {
        return {
          code: 0,
          data: {
            name: 'vben',
          },
        }
      },
    },
    {
        url: '/api/createUser',
        method: 'get',
        response: () => {
          return {
            code: 200,
            message: 'ok',
            data: Mock.mock({
              'list|4': [
                {
                  id: '@id',
                  name: '@cname',
                  age: Random.integer(1, 100),
                  address: '@county',
                  city: '@city',
                  province: '@province',
                  email: Random.email(),
                  phone: /^1[0-9]{10}$/,
                  regin: '@region',
                  url: '@url',
                  date: Random.date('yyyy-MM-dd')
                }
              ]
            })
          };
        }
      }
  ];