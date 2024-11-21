import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

import Image from "next/image";

import GithubIcon from "@/public/icons/GithubIcon.svg";
import LinkedInIcon from "@/public/icons/LinkedInIcon.svg";
import PersonalWebsiteIcon from "@/public/icons/PersonalWebsiteIcon.svg";

import type { ReactElement } from "react";

export default function SocialsStack(): ReactElement {
  return (
    <Stack
      gap={2}
      sx={{ display: "flex", flexDirection: "row" }}
    >
      <Link href="https://www.github.com/bobotato/spendsplit" target="_blank" rel="noopener noreferrer">
        <Image
          className="hover:filter-green"
          src={GithubIcon}
          alt="Github Link"
          width={30}
          height={30}
        />
      </Link>

      <Link href="https://www.linkedin.com/in/alexanderbhojwani/" target="_blank" rel="noopener noreferrer">
        <Image
          className="hover:filter-green"
          src={LinkedInIcon}
          alt="Linkedin Link"
          width={30}
          height={30}
        />
      </Link>

      <Link href="https://alexdb.me/" target="_blank" rel="noopener noreferrer">
        <Image
          className="hover:filter-green"
          src={PersonalWebsiteIcon}
          alt="Personal Website Link"
          width={35}
          height={30}
        />
      </Link>
    </Stack>
  );
}
