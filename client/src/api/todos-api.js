import Axios from 'axios'

export async function getTodos(idToken) {
  console.log('Fetching todos')

  const response = await Axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/todos`,
    {
      // 'Content-Type': 'application/json',
      // Authorization:Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im42SDhiMTJMV1BRSDNvTUMwbXZnUCJ9.eyJuaWNrbmFtZSI6InNvaXNhdHRodTAwMyIsIm5hbWUiOiJzb2lzYXR0aHUwMDNAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2EzNWQwNDBhOTIyN2M0Y2VlNjFiN2I0NjBmYTBjZGUzP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGc28ucG5nIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMTVUMTQ6MDc6NTEuMTA3WiIsImVtYWlsIjoic29pc2F0dGh1MDAzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi10YTN4ZXE4Z255a2M2em8yLnVzLmF1dGgwLmNvbS8iLCJhdWQiOiIyQXRMYzlPM0RnR2JMV3E2dW9qM01wSlJpTVFuMVFKQyIsImlhdCI6MTcxMzI3NDM0NSwiZXhwIjoxNzEzMzEwMzQ1LCJzdWIiOiJhdXRoMHw2NjFhNThiNDg0MTE2YzcxODAwNDBmYWIiLCJzaWQiOiJSZ0JVVW1BMjc0YmRrbnU3bVdNUS1YVjlSNTRfN1h5TiIsIm5vbmNlIjoiYWxNNFJGOXBiVFpRZDFCc1ZYazBkUzF5TkVkRFgzQmxObEZ2UXpaa1VFVTFWa2hSTVZSTldsWTRadz09In0.AUdo-xZ9yaTUOAQ45QWmrpDlxVo7vNusMjDoxgYjqATKU4xhZbYzjsKbWSF8W4biQ_7BZ1fIrray7ogve0Sd4iV5ZUNB-IjkPUD9h5h2X_VqXYxC9rO1myHP4yVhU615ZfsNKR38mQoU8Kf1ryNWiifN7S2piOxcJ_2dNxOAwEhHh2G98WaiHdtHAZHCiwaZfLpVU2m5NFYLs156kfBu9PKkUMm0_PVlx-TLBIBGIfSHlKguf6scWDlLtMkzCMXqm_JTtZKaYX3JIrxn5Xhk_NQSCOOq14ruHQI2C_moG-ANKyDjGJ6EPfA8Ej-6LYtJZJv6E0HFfwoukDzbpBVkzA
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im42SDhiMTJMV1BRSDNvTUMwbXZnUCJ9.eyJpc3MiOiJodHRwczovL2Rldi10YTN4ZXE4Z255a2M2em8yLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NjFhNThiNDg0MTE2YzcxODAwNDBmYWIiLCJhdWQiOlsiaHR0cHM6Ly9kZXYtdGEzeGVxOGdueWtjNnpvMi51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vZGV2LXRhM3hlcThnbnlrYzZ6bzIudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcxMzQ1MjM3MywiZXhwIjoxNzEzNTM4NzczLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiMkF0TGM5TzNEZ0diTFdxNnVvajNNcEpSaU1RbjFRSkMifQ.NulUkyZRQ7q7EtaKgm9fgjKBrRViWOmzk61R4Y1DW5IeIuXAaZINSjD2-FzcHK51aUOER3VlsrpTyN-qjlFyVvrBtN7dWOiGJp3O3rRolGRXCjk39Kfn13gA38vs76WNM7oFDIuHbDEyaww32jY8h2TA54rHbmhdHjPoGPEExDiDr0odfek9M92nVlrGxgu8S5emmFosQ6EQauflmuKRh20RIm82VjHUVVisAenZVejHSNATE2-eRkEGZnwODBZQd3DBXPWq2mL_9nsXC0_-EFTvv-eia-XB_fhlNt8EzokT3sonOHxLotsaqQwKI6cZ4-ydXEuIxJRfMPTyDxueaQ`
      }
    }
  )
  return response.data.items
}

export async function createTodo(idToken, newTodo) {
  const response = await Axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/todos`,
    JSON.stringify(newTodo),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  return response.data.item
}

export async function patchTodo(idToken, updatedTodo) {
  await Axios.patch(
    `${process.env.REACT_APP_API_ENDPOINT}/todos`,
    JSON.stringify(updatedTodo),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
}

export async function deleteTodo(idToken, id) {
  await Axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/todos`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      },
      data: {
        id
      }
    })
}

export async function getUploadUrl(idToken, id) {
  const response = await Axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/todos/attachment/${id}`,
    '',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl, file) {
  await Axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': "image/png"
    }
  })
}
