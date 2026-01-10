---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const rappresentanti = [
  {
    avatar: "https://www.github.com/yyx990803.png",
    name: "Unione Europea",
    title: "Developer",
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ],
  }
]
const staff = [
{
  avatar: "https://www.github.com/yyx990803.png",
  name: "Unione Europea",
  title: "Developer",
  links: [
    { icon: 'github', link: 'https://github.com/yyx990803' },
    { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
  ],
}]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Chi siamo</template>
    <template #lead>...</template>
  </VPTeamPageTitle>
  <VPTeamPageSection>
    <template #title>I rappresentanti</template>
    <template #lead>...</template>
    <template #members>
      <VPTeamMembers size="medium" :members="rappresentanti" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>Lo staff</template>
    <template #lead>...</template>
    <template #members>
      <VPTeamMembers size="small" :members="staff" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
