import { LanguagesIterator, Extrator, Lang } from './lib'

const Languages = new LanguagesIterator(
  [ Lang.EnUs, Lang.Es ],
  Extrator()
)

Languages
  .translate()
  .then(() => Languages.save())
  .then((data: string[]) => console.log(data))
  .catch((err: any) => console.error(err))
