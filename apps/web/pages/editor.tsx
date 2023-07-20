import React, { useRef } from 'react'
import { SourceCodeEditor } from '@editor/SourceCodeEditor'
import { services } from '@services/api'
import Layout from '@layouts/layout'

type CodeEditorProps = {
  runCode: () => void
}

export default function Web() {
  const editorRef = useRef<CodeEditorProps>(null)

  // const onRun = async () => {
  //   console.log('onRun-->');
  //   const res = await fetchCode()
  //   console.log('res', res)
  //   const data = await res.json();
  //   console.log('res-data', data)
  // }

  const onRunJs = async () => {
    console.log('onRunJs-->')

    if (editorRef.current) {
      editorRef.current?.runCode()
    }
  }

  const onGetContainerStatus = async () => {
    const containerName = '1874f672f0a7'
    // const containerName = '173063551e6f' // nginx
    const res = await services.getContainerStatus({ containerName })
    const data = await res.json()
    console.log('getRunningContainerApi', data)
  }

  const onGetRunningContainer = async () => {
    const data = await services.getRunningContainer()
    console.log('getRunningContainerApi', data)
  }

  const onStopContainer = async () => {
    // const containerName = '1874f672f0a7'
    const containerName = '173063551e6f' // nginx
    const data = await services.stopContainer({ containerName })
    console.log('onStopContainer', data)
  }

  const onStartContainer = async () => {
    const containerName = '1874f672f0a7' // exited
    // const containerName = '173063551e6f' // nginx
    const data = await services.startContainer({ containerName })
    console.log('onStopContainer', data)
  }

  const onBuildImage = async () => {
    const params = {
      dockerfileName: 'node.client',
      imageName: 'node-client',
    }
    const data = await services.buildDockerImage(params)
    console.log('onStopContainer', data)
  }

  return (
    <Layout>
      <div>
        <h1>Web</h1>
        {/* <Button /> */}
        {/* <div>
        <button onClick={onRun}>run</button>
      </div> */}

        <div>
          <button onClick={onGetContainerStatus}>get Container Status</button>
        </div>

        <div>
          <button onClick={onGetRunningContainer}>get Running Container</button>
        </div>

        <div>
          <button onClick={onStopContainer}>stop Container</button>
        </div>

        <div>
          <button onClick={onRunJs}>run js</button>
        </div>

        <div>
          <button onClick={onStartContainer}>Start Container</button>
        </div>

        <div>
          <button onClick={onBuildImage}>build Image</button>
        </div>

        <SourceCodeEditor ref={editorRef} />
      </div>
    </Layout>
  )
}
