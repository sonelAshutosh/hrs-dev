import React from 'react'

function Index() {
  return <div>Client Side</div>
}

export default Index

Index.getLayout = function PageLayout(page) {
  return <>{page} </>
}
