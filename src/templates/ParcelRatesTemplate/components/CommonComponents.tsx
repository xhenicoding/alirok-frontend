import { Button, Icon } from '@alirok.com/rok-ui'

export const DefaultVendor = () => (
  <Button
    variant="bordered"
    dashed={true}
    borderColor="primary"
    width={160}
    size="large"
    circle={true}
  >
    <Icon name="money" width="30px" height="30px" />
  </Button>
)
