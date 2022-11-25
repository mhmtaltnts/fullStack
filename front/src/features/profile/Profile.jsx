import React from 'react'
import { Form, useLoaderData, useParams } from "react-router-dom";
import {getProfileById} from "./useProfileApi"
import useAuth from "../../hooks/useAuth"

export async function useLoader({ params }) {
    return getProfileById(params.id);
  }

const Profile = () => {
    const profile = useLoaderData();
    const params = useParams()
    const {id} = params.id
  return (
    <Form id="profile-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={profile.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={profile.last}
        />
      </p>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="file"
          name="avatar"
          defaultValue={profile.avatar}
        />
      </label>
      <label>
        <span>Address</span>
        <input
          placeholder="address"
          aria-label="Address"
          type="text"
          name="address"
          defaultValue={profile.address}
        />
        </label>
      <label>
        <span>City</span>
        <input
          placeholder="city"
          aria-label="City"
          type="text"
          name="city"
          defaultValue={profile.city}
        />
      </label>
      <label>
        <span>Region</span>
        <input
          placeholder="region"
          aria-label="Region"
          type="text"
          name="region"
          defaultValue={profile.region}
        />
      </label>
      <label>
        <span>Country</span>
        <input
          placeholder="Country"
          aria-label="Country"
          type="text"
          name="country"
          defaultValue={profile.country}
        />
      </label>
      <label>
        <span>Postal Code</span>
        <input
          placeholder="Postal Code"
          aria-label="Postal Code"
          type="text"
          name="postalCode"
          pattern="[0-9]{5}"
          defaultValue={profile.postalCode}
        />
      </label>
      <label>
        <span>Phone</span>
        <input
          placeholder="Phone"
          aria-label="Phone"
          type="tel"
          name="Phone"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          defaultValue={profile.phone}
        />
      </label>
      <p>
        <button type="submit">Edit</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  )
}

export default Profile