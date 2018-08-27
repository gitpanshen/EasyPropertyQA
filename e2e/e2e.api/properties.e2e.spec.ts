import { requestBuilder } from './request.builder.promise';

describe('/api/properties', () => {
  let count=0;

  it('should get current properties number', async () => {
    const response = await requestBuilder('http://localhost:3000/api/properties')
      .get();
    count = response.length;
  });

  it('should add properties', async () => {
    const response = await requestBuilder('http://localhost:3000/api/properties')
      .body({
        name: 'Test Property',
        address: '23 Baker st.',
      })
      .resolveWithFullResponse()
      .post();
    expect(response.statusCode).toBe(200);
  });

  it('should get new properties', async () => {
    const response = await requestBuilder('http://localhost:3000/api/properties')
      .get();
    expect(response.length).toBe(count + 1);
    expect(response[count].name).toEqual('Test Property');
    expect(response[count].address).toEqual('23 Baker st.');
  });

  it('should update property', async () => {
    const responseBeforePut = await requestBuilder('http://localhost:3000/api/properties')
    .get();
    count = responseBeforePut.length;
    let newName = responseBeforePut[count-1].name.split('(')[0]+` updated at ${Date()}`;
    let newAddress = responseBeforePut[count-1].address.split('(')[0]+` updated at ${Date()}`;
    let id = responseBeforePut[count-1]._id;
    const response = await requestBuilder('http://localhost:3000/api/properties')
      .body({
        name: newName,
        address: newAddress,
        _id: id,
      })
      .resolveWithFullResponse()
      .put();
    expect(response.statusCode).toBe(200);
  });

  it('should get updated property', async () => {
    const response = await requestBuilder('http://localhost:3000/api/properties')
      .get(); 
    expect(response.length).toBe(count);
  });

});
