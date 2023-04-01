import {
    PageSection,
    AsideConteiner,
    ContentPage,
    Boxbreadcrumbs,
    ContainerContent,
    Bread
} from './styles';

export const SectionPage = () => {
    return (
        <>
            <PageSection>
                <Bread>
                    <Boxbreadcrumbs>
                    </Boxbreadcrumbs>
                </Bread>
                <ContainerContent>
                    <AsideConteiner>
                    </AsideConteiner>

                    <ContentPage>
                    </ContentPage>
                </ContainerContent>
            </PageSection>
        </>

    )
}

export default SectionPage;