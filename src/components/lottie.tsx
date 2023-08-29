import { useLottie } from 'lottie-react';
import { type FunctionComponent } from 'react'

type LottieProps={
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    animationData:any,
    loop?:boolean
}

const Lottie:FunctionComponent<LottieProps> = ({animationData, loop=true}) => {
    const options = {
        animationData,
        loop
      };
    
      const { View } = useLottie(options);
    
      return <>{View}</>;
}

export default Lottie