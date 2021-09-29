interface SmGapProps {
  h: number
}

export default function SmGapH(props: SmGapProps) {
  return <>
    <div style={{height: props.h}}>&nbsp;</div>
  </>
}
