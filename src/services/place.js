/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-useless-catch */
import { request } from "../helpers/request";

const placeService = {
  getPlaces: async (authToken, page, limit, filters) => {
    console.log('filters', filters);
    
    try {
      const response = await request.get('/admin/places', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          page,
          limit,
          countryName: filters?.countries,
        }
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      throw error;
    }
  },
  getPlace: async (id, authToken) => {
    try {
      const response = await request.get(`/admin/places/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Something went wrong');
    }
    } catch (error) {
      throw error;
    }
  },
  addPlace: async (values, authToken) => {
    try {
      const response = await request.post(
        '/admin/places',
        {
          country_id: values?.country_id,
          country_name: values?.country_name,
          title: values?.title,
          description: values?.description,
          contact_id: values?.contact_id,
          rating: values?.rating,
          imageUrl: values?.imageUrl,
          location: values?.location,
          latitude: values?.latitude,
          longitude: values?.longitude,
          confirmed: values?.confirmed,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      throw error;
    }
  },

  updatePlace: async (values, authToken, placeId) => {
    try {
      const response = await request.put(
        '/admin/places',
        {
          placeId,
          country_id: values?.country_id,
          country_name: values?.country_name,
          title: values?.title,
          description: values?.description,
          contact_id: values?.contact_id,
          rating: values?.rating,
          imageUrl: values?.imageUrl,
          location: values?.location,
          latitude: values?.latitude,
          longitude: values?.longitude,
          confirmed: values?.confirmed,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      throw error;
    }
  },

  deletePlace: async (id, authToken) => {
    try {
      const response = await request.delete('/admin/places', {
        data: 
        { 
          placeId: id
        },
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      throw error;
    }
  }
};

export default placeService;