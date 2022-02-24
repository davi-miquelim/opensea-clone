import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'qeganhy0',
  dataset: 'production',
  apiVersion: 'v2021-10-21',
  token:
    'skBoMuhLxSU5fQys1rDS3gt8FHAJRkXvIVb2yVixdcUKuWyRRemhENeJ7tfyWe7UmEM4oyDAVCT9IjhCPNNKx78k1MXDEYm7WXwtfNcDJWUeATsgdpyYlm34CYh33ajo5hRaNGxdfdWrZJcL1nE5k490UgSQXtxYIT38nzWWsWQm1G0GK3QL',
  useCdn: false,
})
