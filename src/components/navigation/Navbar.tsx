export function Navbar() {
	return (
		<nav>
			<ul>
				{/* Server */}
				<li>
					<a href="server-components">Server components</a>
				</li>
				<li>
					<a href="server-action">Server action</a>
				</li>
				{/* Client */}
				<li>
					<a href="client-side">Client side</a>
				</li>
				<li>
					<a href="async-transitions">Async transitions</a>
				</li>
				<li>
					<a href="use-action-state">Use action state</a>
				</li>
				<li>
					<a href="use-optimistic">Use optimistic</a>
				</li>
				<li>
					<a href="use-form-status">Use form status</a>
				</li>
				{/* Suspense */}
				<li>
					<a href="suspense">Suspense</a>
				</li>
				{/* Misc */}
				<li>
					<a href="meta">Metadata</a>
				</li>
				<li>
					<a href="prefetch-preconnect">Prefecth/preconnect</a>
				</li>
			</ul>
		</nav>
	);
}
