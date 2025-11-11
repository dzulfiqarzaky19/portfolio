import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/experience/raiz')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/experience/raiz"!</div>
}
