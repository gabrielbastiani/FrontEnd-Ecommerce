import { ButtonPage, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from "./styles"

export const PagesUx = () => {
    return (
        <ContainerPagination>
            <TotalBoxItems>
                <TextTotal></TextTotal>
            </TotalBoxItems>
            <ContainerCategoryPage>
                <Previus>
                    <ButtonPage>
                    </ButtonPage>
                </Previus>
                <TextPage>
                </TextPage>
                <Next>
                    <ButtonPage>
                    </ButtonPage>
                </Next>
            </ContainerCategoryPage>
        </ContainerPagination>
    )
}