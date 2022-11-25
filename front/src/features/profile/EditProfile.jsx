import React from 'react'
import { Form, useLoaderData, useParams, redirect } from "react-router-dom";
import {updateProfile}  from "./useProfileApi"


export async function useAction({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateProfile(params.id, updates);
    return redirect(`/profiles/${params.id}`);
  }

const EditProfile = () => {
    
    const profile = useLoaderData();
  return (
    <Form method="post" id="profile-form">
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
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  )
}

export default EditProfile