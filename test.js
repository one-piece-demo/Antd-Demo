/**
 * @title 按钮类型
 */
import Button from 'components/Button'

const ButtonType = () => {
  return (
    <div>
      <Button>默认</Button>
      <Button type="minor">次要</Button>
    </div>
  )
}

/**
 * @title 按钮尺寸
 */
import Button from 'components/Button'

const ButtonSize = () => {
  return (
    <div>
      <Button size="lg">大尺寸</Button>
      <Button>默认</Button>
      <Button size="sm">小尺寸</Button>
    </div>
  )
}
